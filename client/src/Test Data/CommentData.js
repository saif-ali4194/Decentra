import { user_list } from "./UserList"
export const comment_data=[
    {   
        id:1,
        p_id:0,
        text:"I like dogs aswell.",
        user:user_list[0],
        date:"06 May, 2023",
        c_cmts:[{
            id:101,
            p_id:1,
            text:"well i like cats.",
            user:user_list[4],
            date:"07 May, 2023"
        },
        {
            id:102,
            p_id:1,
            text:"rats are clearly superior.",
            user:user_list[3],
            date:"07 May, 2023"
        }
    ]
    }
]