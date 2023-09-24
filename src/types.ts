type TetrominoConfig = {
    n:number,
    color:number
}

type Block = {
    elem:HTMLElement;
    x:number;
    y:number;
    color:number;
}
type SetBlock = Block & {
    i:number;
    n:TetrominoConfig;
}

type Tetromino = SetBlock[]

export type { TetrominoConfig, Block, SetBlock, Tetromino }