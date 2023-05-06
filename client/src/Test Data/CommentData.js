import { user_list } from "./UserList"
export const comment_data=[
    {   
        id:10,
        p_id:0,
        text:"I like dogs aswell.",
        user:user_list[0],
        date:"06 May, 2023",
        c_cmts:[{
            id:101,
            p_id:10,
            text:"well i like cats.",
            user:user_list[4],
            date:"07 May, 2023"
        },
        {
            id:102,
            p_id:10,
            text:"rats are clearly superior.",
            user:user_list[3],
            date:"07 May, 2023"
        }
    ]
    },
    {   
        id:20,
        p_id:1,
        text:"I'm really excited.",
        user:user_list[2],
        date:"06 May, 2023",
        c_cmts:[{
            id:103,
            p_id:20,
            text:"The Future is now.",
            user:user_list[1],
            date:"07 May, 2023"
        },
        {
            id:104,
            p_id:20,
            text:"Its like a dream come true.",
            user:user_list[5],
            date:"07 May, 2023"
        }
    ]
    },
    {   
        id:40,
        p_id:2,
        text:"Big Fan.",
        user:user_list[4],
        date:"06 May, 2023",
        c_cmts:[{
            id:107,
            p_id:40,
            text:"You Truly are Tony Stark IRL.",
            user:user_list[2],
            date:"07 May, 2023"
        },
        {
            id:108,
            p_id:40,
            text:"Hopefully i'll live to see mars.",
            user:user_list[0],
            date:"07 May, 2023"
        }
    ]
    },
    {   
        id:30,
        p_id:2,
        text:"Yeh Rocket Kitne Ka Hai.",
        user:user_list[5],
        date:"06 May, 2023",
        c_cmts:[{
            id:105,
            p_id:30,
            text:"Tumhari Range Se Bahir Hai.",
            user:user_list[3],
            date:"07 May, 2023"
        },
        {
            id:106,
            p_id:30,
            text:"B******D.",
            user:user_list[2],
            date:"07 May, 2023"
        }
    ]
    }
]