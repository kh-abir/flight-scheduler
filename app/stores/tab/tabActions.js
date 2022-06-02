export const SET_SELECTED_TAB = 'SET_SELECTED_TAB'

export const setSelectedTab = selectedTab => {
    return {
        type: SET_SELECTED_TAB,
        payload: selectedTab
    }
}
