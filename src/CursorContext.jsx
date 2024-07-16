import React, { createContext, useReducer } from "react";

const CursorContext = createContext();

const initialState = {
  alpha:1,
  filter:"gooey",
  position: { x: 0, y: 0 },
  scale: 1,
  leftPosition: 0,
  defaultStyle: {
    width: "40px",
    height: "40px",
    scale: 1,
  },
};

function cursorReducer(state, action) {
  switch (action.type) {
    case "SET_POSITION":
      return {
        ...state,
        position: action.payload,
      };
    case "SET_SCALE":
      return {
        ...state,
        defaultStyle: {
          ...state.defaultStyle,
          scale: action.payload,
        },
      };
    case "SET_LEFT_POSITION":
      return {
        ...state,
        leftPosition: action.payload,
      };
      case "SET_FILTER":
        return {
          ...state,
          filter: action.payload,
      };
    case "SET_ALPHA":
      return{ 
        ...state,
          alpha:action.payload,
      }
    
    default:
      return state;
  }
}


function CursorProvider({ children }) {
    const [state, dispatch] = useReducer(cursorReducer, initialState);
  
    return (
      <CursorContext.Provider value={{ state, dispatch }}>
        {children}
      </CursorContext.Provider>
    );
}
  
export { CursorContext, CursorProvider };