import React from 'react';
import "./TestContainer.css";
import WidgetGridTest from './WidgetGridTest';
import WeekCalendar from './WeekCalendar';
import HistoryList from "./HistoryList";

const HomeProducts = () => {
    return (
        <div className='testContainer'>
            <WeekCalendar />
            <WidgetGridTest />
            <HistoryList /> 
        
            
        </div>
    );
};

export default HomeProducts;

