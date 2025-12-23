import { useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";

export const headers = [
    {name: 'name', value: 'Name'},
    { name: 'id', value: 'Address' },
    { name: 'likes', value: 'Likes' },
    { name: 'dislikes', value: 'Dislikes' }
]

export const usePlayerScreen = () => {
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);

    const { players, isLoading, error } = UseGraph();
    if(isLoading || error || !players) return null;

    return {
        isLoading,
        error,
        headers,
        players,
        selectedPlayerId,
        setSelectedPlayerId,
        closeModal: () => { setSelectedPlayerId(null) },
    }
}