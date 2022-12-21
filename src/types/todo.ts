export type Todo = {
    id: number;
    title: string;
    content: string;
    startDate: string,
    endDate: string,
    cover: string,
}

export type TodoKeys = keyof Todo;