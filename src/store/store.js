import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'           // Allow redux devtools to work with zustand
import produce from "immer";

// https://docs.pmnd.rs/zustand/getting-started/introduction
// Your store is a hook! 
// You can put anything in it: primitives, objects, functions. The set function merges state.

let store = (set) => ({


    /*
    UserName: "empty",
    addUserName: (username) => set((state) => ({UserName: username})),
    clearUserName: () => set((state) => ({UserName: "empty"})),

    // Global Store
    const addUserName = useStore((state)=> state.addUserName);

    // Set Global Store Values
    addUserName(event.target.username.value);

    */


    


    // Example creating a person array in state
    // Then you can add a person to the array by calling the global state from a page or component
    // const newPersonArray = useStpre(state) => state.addPerson('James Doe'));

    people: ['John Doe', 'Jane Doe'],
    addPerson: (person) => set((state) => ({people: [...state.people, person]})),

    // Example creating a bear counter
    // Increase the counter from a component by - const increaseBearPopulation = useStore((state) => state.increasePopulation);
    //          return <button onClick={increasePopulation}>one up</button>
    // Reset the counter from a component by - const resetBears = useStore((state) => state.removeAllBears);
    //          return <button onClick={resetBears}>reset</button>
    bears: 0,
    increasePopulation: () => set((state) => ({ ...state.bears, bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),


    // Immer
    // Changing deeply Nested state using Immer.
    car: {
        make: "Toyota",
        model: {
            name: "Camry",
            designation: "SX"
        }
    },
    changeCarModel: (newModelName) => set(
        produce((draft) => {
            draft.car.model.name = newModelName;               // Immer allows us to write like this when using immuateable objects
        })
    ),
    changeCarDesignmation: (newDesig) => set(
        produce((draft) => {
            draft.car.model.designation = newDesig;
        })
    )

    /*
        Without using Immer you'd need to write:

        car: {
            make: "Toyota",
            model: {
                name: "Camry",
                designation: "SX"
            }
        },
        changeCarModel: (newModelName) => set(state) => ({
            ...state.car,                                               // Spread operator everywhere. We copy objects and create new ones as we cant change them. Imutable.
            model: {
                ...state.model,
                name: newModelName
            }
        })
        changeCarDesignmation: (newDesig) => set(state) => ({
            ...state.car,
            model: {
                ...state.model,
                designation: newDesig
            }
        ),

    */

});


    store = devtools(store);                                    // Wrap the store the the devtools middlewear. Allows us to use redux devtools.
    store = persist(store, { name: 'myAppsSettings'});          // Save the store to local storage with persist(). Allows us to keep state after page refresh.


const useStore = create(store);

export default useStore;