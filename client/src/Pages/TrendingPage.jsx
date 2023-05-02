import React from 'react';
import '../styles/Pages/TrendingPage.css'
import Trending from '../components/Trending';

const TrendingPage = () => {
    return ( 
        <div className="trending-page">
            
            <Trending trendAmount={10}/>
        </div>
     );
}
 
export default TrendingPage;