export enum Status{
    Completed = "completed",
    Pending = "pending"
}

export interface ITodo{
    task:string,
    dealLine: string,
    status: Status

}