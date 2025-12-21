import { useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";
import { ClientState } from "../../../models/IArcanePact";

export const headers = [
    {name: 'name', value: 'Name'},
    { name: 'id', value: 'Address' },
    { name: 'likes', value: 'Likes' },
    { name: 'dislikes', value: 'Dislikes' }
]

export const usePlayerScreen = () => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const { players, isLoading, error } = UseGraph();

    return {
        isLoading,
        error,
        headers,
        players,
        selectedPlayer,
        setSelectedPlayer,
        closeModal: () => { setSelectedPlayer(null) },
    }
}