import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

// Определение типов (как и раньше)
type State = string;
type Symbol = string;
type Direction = 'L' | 'R';

interface Transition {
    write: Symbol;
    move: Direction;
    nextState: State;
}

interface TuringMachineConfig {
    states: State[];
    alphabet: Symbol[];
    blank: Symbol;
    initialState: State;
    acceptingStates: State;
    transitions: { [key: State]: { [read: Symbol]: Transition | string } };
    input: Symbol[];
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function waitForEnter(){
  return new Promise((resolve) => rl.question("Нажмите Enter для продолжения...",resolve))
}

class TuringMachine {
    private config: TuringMachineConfig;
    private tape: Symbol[];
    private headPosition: number;
    private currentState: State;

    constructor(config: TuringMachineConfig) {
        this.config = config;
        this.tape = [config.blank, ...config.input, config.blank];
        this.headPosition = 1;
        this.currentState = config.initialState;
    }

    private readSymbol(): Symbol {
        return this.tape[this.headPosition];
    }

    private writeSymbol(symbol: Symbol): void {
        this.tape[this.headPosition] = symbol;
    }

    private moveHead(direction: Direction): void {
        if (direction === 'L') {
            this.headPosition--;
            if (this.headPosition < 0) {
                this.tape.unshift(this.config.blank[0]);
                this.headPosition = 0;
            }
        } else {
            this.headPosition++;
            if (this.headPosition >= this.tape.length) {
                this.tape.push(this.config.blank[0]);
            }
        }
    }


    public async step(steps: number): Promise<boolean> {
        const symbol = this.readSymbol();
        const stateTransitions = this.config.transitions[this.currentState];

        if (!stateTransitions) {
            console.log(`Не найдено переходов для состояния ${this.currentState}`);
            return false;
        }

        const transition = stateTransitions[symbol];

        if (!transition) {
            console.log(`Не найден переход для состояния ${this.currentState} и символа ${symbol}`);
            return false;
        }
        const {nextState, write, move} = transition as Transition
        console.clear()
        console.log(`Шаг: ${steps + 1}`);
        console.log(`Текущее состояние: ${this.currentState}, Прочитанный символ: ${symbol}`);
        console.log(`Применяем переход: ${this.currentState},${symbol} -> ${nextState},${write},${move}`);
        console.log(`Лента: ${this.tape.join('')}, Позиция: ${this.headPosition}`);

        this.writeSymbol(write);
        this.moveHead(move);
        this.currentState = nextState;
        console.log('Выполнение...');

        console.log(`Лента: ${this.tape.join('')}, Позиция: ${this.headPosition}`);

        await waitForEnter();

        return true;
    }

    public async run(): Promise<boolean> {
        let steps = 0;
        const maxSteps = 100;

        while (steps < maxSteps) {
            if (!await this.step(steps)) {
                break;
            }

            if (this.config.acceptingStates.includes(this.currentState)) {

                console.log("Принято!");
                console.log(`Шагов: ${steps}`);
                
                return true;
            }

            steps++;
        }

        if (steps === maxSteps) {
            console.log("Достигнуто максимальное количество шагов.");
        }

        console.log("Отклонено.");
        return false;
    }

    public getTape(): Symbol[] {
        return this.tape;
    }

    public getHeadPosition(): number {
        return this.headPosition;
    }

    public getCurrentState(): State {
        return this.currentState;
    }
}

async function configureTuringMachine(): Promise<TuringMachineConfig> {
    const states = ((await askQuestion("Введите список состояний: ")).split(',')).map(v => v.trim()).filter((v, i, s) => s.indexOf(v) === i);
    const alphabet = await (async () => {
      while (true) {
        console.clear();
        console.log(`Введите список состояний: ${states.join(',')}`);        
        const res = (await askQuestion( "Введите список символов алфавита: ")).split(',').map(v => v.trim()).filter((v, i, s) => s.indexOf(v) === i)
        if (res.every((v) => v.length == 1)) return res
      }
    })()
    const blank = await (async () => {
      while (true) {
        console.clear();
        console.log(`Введите список состояний: ${states.join(',')}`);
        console.log(`Введите список символов алфавита:  ${alphabet.join(',')}`);

        const res = (await askQuestion("Введите символ пустого места: "))[0]
        if (alphabet.includes(res)) return res
      }
    })()
    const initialState = await (async () => {
      while (true) {
        console.clear();
        console.log(`Введите список состояний: ${states.join(',')}`);
        console.log(`Введите список символов алфавита:  ${alphabet.join(',')}`);
        console.log(`Введите символ пустого места: ${blank}`);
        

        const res = (await askQuestion("Введите начальное состояние: "))
        if (states.includes(res)) return res
      }
    })()
    const acceptingStates = await (async() => {
      while (true) {
        console.clear();
        console.log(`Введите список состояний: ${states.join(',')}`);
        console.log(`Введите список символов алфавита:  ${alphabet.join(',')}`);
        console.log(`Введите символ пустого места: ${blank}`);
        console.log(`Введите начальное состояние:  ${initialState}`);
        const res = (await askQuestion("Введите заключительное состояние: "));
        if (states.includes(res)) return res
      }
    })()
    const input = await (async () => {
      while (true) {
        const res = (await askQuestion("Введите входные данные: ")).split('');
        if (res.every((v) => alphabet.includes(v))) return res
      }
    })()

    const transitions: { [key: State]: { [read: Symbol]: Transition } } = {};
    for (const state of states) {
      if (acceptingStates.includes(state)) continue
        transitions[state] = {};
        for (const symbol of alphabet) {
            const res = await (async () => {
              while (true) {
                const [nextState, write, move] = (await askQuestion(`Введите данные для перехода в состоянии ${state} при чтении символа ${symbol}:`)).split(',').map(v => v.trim()) as [State, Symbol, Direction]
                if (states.includes(nextState) && alphabet.includes(write[0]) && (move.toUpperCase() == 'L' || move.toUpperCase() == 'R')) return {nextState, write, move: move.toUpperCase()} as Transition
              }
            })()
            transitions[state][symbol] = res;
        }
    }

    return {
        states,
        alphabet,
        blank,
        initialState,
        acceptingStates,
        transitions,
        input,
    };
}

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function saveConfigToFile(config: TuringMachineConfig, filename: string): Promise<void> {
    const configJson = JSON.stringify(config, null, 2);
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(filename, configJson, (err) => {
            if (err) {
                console.error(`Ошибка при записи в файл ${filename}:`, err);
                reject(err);
            } else {
                console.log(`Конфигурация сохранена в файл ${filename}`);
                resolve();
            }
        });
    });
}

async function loadConfigFromFile(filename: string): Promise<TuringMachineConfig | null> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // Файл не найден
                    resolve(null);
                } else {
                    console.error(`Ошибка при чтении файла ${filename}:`, err);
                    reject(err);
                }
            } else {
                try {
                    const config = JSON.parse(data);
                    resolve(config);
                } catch (parseError) {
                    console.error(`Ошибка при разборе JSON из файла ${filename}:`, parseError);
                    reject(parseError);
                    resolve(null); // Добавлено для соответствия типу Promise
                }
            }
        });
    });
}


    

    const defaultFilename = 'config.json';
    let config: TuringMachineConfig | null = null;

    // Check if config file exists
    if (fs.existsSync(defaultFilename)) {
        const useConfigFile = await askQuestion(`Файл конфигурации ${defaultFilename} найден. Использовать его? (y/n): `);
        if (useConfigFile.toLowerCase() === 'y') {
            config = await loadConfigFromFile(defaultFilename);
            if (!config) {
                console.log(`Ошибка при загрузке конфигурации из файла ${defaultFilename}. Запрос конфигурации вручную.`);
            }
        }
    }

    // If configuration was not loaded from file, request it from the user
    if (!config) {
        config = await configureTuringMachine();
        const saveConfig = await askQuestion("Сохранить конфигурацию в файл? (y/n): ");
        if (saveConfig.toLowerCase() === 'y') {
            await saveConfigToFile(config, defaultFilename); // Always save to default filename
        }
    }

    if (!config) {
        console.error("Не удалось получить конфигурацию машины Тьюринга.");
        rl.close();
        throw new Error()
    }
    const {states, alphabet, transitions, acceptingStates, initialState, input} = {...config}
    if (typeof transitions !== 'string') {
        console.log("Конфигурация машины Тьюринга:");
        console.log(`Q = {${states.join(', ')}}`);
        console.log(`A = {${alphabet.join(', ')}}`);
        console.log(`δ:`);
        const tt:{ [key: State]: { [read: Symbol]: Transition | string } } = {} 
        for (const state of states) {
          if (acceptingStates.includes(state)) continue
          for (const symbol of config.alphabet) {
            const {nextState, write, move} = transitions[state][symbol] as Transition
            console.log(`${state},${symbol} -> ${nextState},${write},${move}`);
          }
        }
    
        for (const state of states) {
          if (acceptingStates.includes(state)) continue
          tt[state] = {}
          for (const symbol of config.alphabet) {
            const {nextState, write, move} = transitions[state][symbol] as Transition
            tt[state][symbol] = `${nextState},${write},${move}`
          }
        }
        console.table(tt)
        console.log(`${initialState} - начальное состояние, ${config.initialState} ∈ Q;`);
        console.log(`${acceptingStates} - заключительное состояние, ${config.acceptingStates} ∈ Q;`);
    }
    
    
    
    
    
    

    await waitForEnter()

    const turingMachine = new TuringMachine(config);

    console.clear()
    console.log("Начальная лента:", turingMachine.getTape().join(""));
    console.log("Начальное состояние:", turingMachine.getCurrentState());
    console.log("Начальная позиция головки:", turingMachine.getHeadPosition());

    await waitForEnter()
    const result = await turingMachine.run();

    console.clear()
    console.log("Конечная лента:", turingMachine.getTape().join(""));
    console.log("Конечное состояние:", turingMachine.getCurrentState());
    console.log("Конечная позиция головки:", turingMachine.getHeadPosition());
    console.log("Результат:", result);

    rl.close();
