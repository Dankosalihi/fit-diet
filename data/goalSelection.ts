export interface UserInformation extends GoalSelection{
    age: number | undefined;
    weight: number | undefined;
    height: number | undefined;
}

export interface GoalSelection{
    goalId: string;
    description: string;
}

export const goalSelections: UserInformation[] = [
    { age: undefined, weight: undefined, height: undefined, goalId: "1" ,description: "Öka vikt"},
    { age: undefined, weight: undefined, height: undefined, goalId: "2" ,description: "Minska vikt"},
    { age: undefined, weight: undefined, height: undefined, goalId: "3" ,description: "Behålla vikt"},
];