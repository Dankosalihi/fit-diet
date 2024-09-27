export interface UserInformation extends GoalSelection{
    weight: number ;
    height: number;
    age: number;
    gender: string;
}

export interface GoalSelection{
    goalId: string;
    description: string;
}


export const goalSelection: GoalSelection[] = [
    {goalId: "1" ,description: "Öka vikt"},
    {goalId: "2",description: "Minska vikt"},
    {goalId: "3" ,description: "Behålla vikt"},
];