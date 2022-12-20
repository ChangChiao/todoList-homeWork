export type Todo = {
    id: string;
    title: string;
    content: string;
    startDate: string,
    endDate: string,
    cover: string,
}

export type TodoKeys = keyof Todo;