export interface UserInformation extends GoalSelection{
    weight: number ;
    height: number;
    age: number;
    gender: string;
}

export interface GoalSelection{
    goalId: string;
    description: string;
    activityLevelId: number;
    activityLevelText: string;
}

export interface ActivityLevelText {
    activityText: string;
    
}


export const goalSelection: GoalSelection[] = [
    {goalId: "1" ,description: "Öka vikt", activityLevelId: 1, activityLevelText: "Låg Aktivitet (lätt träning 1-3 dagar i veckan)"},
    {goalId: "2",description: "Minska vikt", activityLevelId: 2,activityLevelText: "Måttlig Aktivitet (måttlig träning 3-5 dagar i veckan)"},
    {goalId: "3" ,description: "Behålla vikt",activityLevelId: 3, activityLevelText: "Hög Aktivitet (hård träning 6-7 dagar i veckan)"},
];

