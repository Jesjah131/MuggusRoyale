/**
 * Todo: Decide if interface for question is needed/advantageous?
 * As of now, this is a marking interface
 */
export interface Question<T, U> {
    Id: string;
    answer(value: T): U; 
}