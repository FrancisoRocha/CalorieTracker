import { useMemo } from "react"
import type { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"

type CaloriTrackerProps = {
    activities: Activity[]
}

export default function CaloriTracker( { activities } : CaloriTrackerProps ) {
    
    //Contadores
    const calorieConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1
        ? total + activity.calories : total, 0), [activities])
    
    const calorieBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2
        ? total + activity.calories : total, 0), [activities])

    const netCalories= useMemo(() => calorieConsumed - calorieBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen De Calorias</h2>
            
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloriesDisplay
                    calories={calorieConsumed}
                    texto='Consumidas'
                />
                <CaloriesDisplay
                    calories={netCalories}
                    texto='Diferencia'
                />
                <CaloriesDisplay
                    calories={calorieBurned}
                    texto='Ejercicio'
                />
            </div>

        </>
    )
}


