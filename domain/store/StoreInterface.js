// @flow
export interface StoreInterface<T> {
    add(item: T | Array<T>): Promise<T | void>,

    save(item: T): Promise<T>,

    delete(item: T): Promise<boolean>,

    findAll(): Promise<Array<T>>,

    findById(id: string): Promise<T | void>,

    findByField(field: string, value: any): Promise<Array<T>>,

    clear(): Promise<boolean>
}
