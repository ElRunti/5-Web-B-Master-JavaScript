import React, { useReducer, useRef, useCallback, useEffect, useState } from "react";

const initializer = (initialValue) => {
    const localData = localStorage.getItem("counter_history");
    if (localData) {
        const parsedHistory = JSON.parse(localData);
        let currentCount = 0;
        if (parsedHistory.length > 0) {
            const lastEntry = parsedHistory[parsedHistory.length - 1];
            const match = lastEntry.match(/Nuevo valor:\s*(-?\d+)/);
            if (match) {
                currentCount = parseInt(match[1]);
            }
        }
        return { count: currentCount, history: parsedHistory };
    }
    return initialValue;
};

const initialState = { count: 0, history: [] };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            const valueToIncrement = action.payload !== undefined ? action.payload : 1;
            const newIncCount = state.count + valueToIncrement;
            return { 
                count: newIncCount, 
                history: [...state.history, `+${valueToIncrement} (Nuevo valor: ${newIncCount})`] 
            };
        case "decrement":
            return { 
                count: state.count - 1, 
                history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`] 
            };
        case "undo":
            if (state.history.length === 0) return state;
            const newHistory = state.history.slice(0, -1);
            let previousCount = 0;
            if (newHistory.length > 0) {
                const lastEntry = newHistory[newHistory.length - 1];
                const match = lastEntry.match(/Nuevo valor:\s*(-?\d+)/);
                if (match) previousCount = parseInt(match[1]);
            }
            return {
                count: previousCount,
                history: newHistory
            };
        case "reset":
            return initialState;
        default:
            return state;
    }
}

function CounterGame() {
    const [state, dispatch] = useReducer(reducer, initialState, initializer);
    const [inputValue, setInputValue] = useState("");
    const incrementBtnRef = useRef(null);

    useEffect(() => {
        if (incrementBtnRef.current) {
            incrementBtnRef.current.focus();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("counter_history", JSON.stringify(state.history));
    }, [state.history]);

    const handleIncrement = useCallback(() => {
        const parsedValue = parseInt(inputValue);
        if (!isNaN(parsedValue)) {
            dispatch({ type: "increment", payload: parsedValue });
            setInputValue("");
        } else {
            dispatch({ type: "increment" });
        }
    }, [inputValue]);

    const handleDecrement = useCallback(() => {
        dispatch({ type: "decrement" });
    }, []);

    const handleUndo = useCallback(() => {
        dispatch({ type: "undo" });
    }, []);

    return (
        <div>
            <h2>Contador: {state.count}</h2>
            <input 
                type="number" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Número específico"
            />
            <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleUndo}>Deshacer</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>

            <h3>Historial de cambios:</h3>
            <ul>
                {state.history.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
}

export default CounterGame;