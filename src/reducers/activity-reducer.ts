import type { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' } 

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities');
    if (!activities) return [];
    
    try {
        const parsed = JSON.parse(activities);
        // Asegurar que sea un array válido
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Error al parsear actividades del localStorage:', error);
        return [];
    }
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if (action.type === 'save-activity') {
        let updatesAcitvities: Activity[] = [];
        if (state.activeId) {
            updatesAcitvities = state.activities.map(activity => activity.id === state.activeId 
                ? action.payload.newActivity 
                : activity )
        } else {
            updatesAcitvities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatesAcitvities,
            activeId : ''
        }

    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )
        }
    }

    if(action.type === 'restart-app'){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state;
}

