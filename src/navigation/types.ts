
export type MainNavigatorStackParamList = {
    HomeScreen: undefined,
}

export type HabitsNavigatorStackParamList = {
    HabitsScreen : undefined,
    CreateHabitScreen : undefined
    HabitDetailScreen : {habit : {
        _id : string,
        title : string,
        description ?:string,
        frequency: string,
        streak : number,
        reminderTime:  string,
        isCompletedToday? : boolean,
        createdAt : string,
        updatedAt : string
    }}
}

export type ProfileNavigatorStackParamList = {
    ProfileScreen: undefined,
}
export type AuthNavigatorStackParamList = {
    WelcomeScreen: undefined,
    LoginScreen : undefined,
    SignupScreen : undefined
}