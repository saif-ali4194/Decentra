import rock1 from "../Data/Test Data/posts/rock1.jpg"
import paint1 from "../Data/Test Data/posts/paint.jpg"
import ceo from "../Data/Test Data/posts/ceo.jpg"
import iiu from "../Data/Test Data/posts/iiu.jpg"
import { user_list } from "./UserList";
import {User} from './CurrentUser';

export const tweets=[
    {
        id:0,
        user:user_list[5],
        user_id:user_list[5].id,
        date:"May 5th, 2023",
        text:"Meet Rusty 🐾 the most adorable and playful puppy 🐶 you'll ever lay your eyes on! This little ball of fur 🐾 is a golden retriever, and he loves nothing more than playing fetch 🎾 with his favorite squeaky toy 🐾. With his big, round eyes 👀 and wagging tail 🐾, Rusty has stolen the hearts 💕 of everyone he meets. Whether he's chasing his tail 🌀 or cuddling up next to you on the couch 🛋️, Rusty is sure to put a smile 😊 on your face. Who can resist this little guy's irresistible charm? 🐶❤️",
        content:user_list[5].avatar
    },
    {
        id:1,
        user:user_list[0],
        user_id:user_list[0].id,
        date:"Apr 28th, 2023",
        text:"Exciting news! As a co-founder, I'm thrilled to announce that we've just made our first post on our web3 Twitter! Decentralized, immutable, and unstoppable - the future of social media is here. Join us and let's explore the endless possibilities of the decentralized world together! #Web3Twitter #Decentralized #Blockchain #Crypto",
        content:ceo
    },

    {
        id:2,
        user:user_list[1],
        user_id:user_list[1].id,
        date:"Apr 1st, 2023",
        text:"Exciting news, i have plans to colonize Mars with a SpaceX Falcon Heavy rocket. The mission aims to create a backup of humanity on the red planet in case of a global catastrophe on Earth. With SpaceX already sending multiple missions to space, we may be closer than ever to becoming a multi-planetary species." ,
        content:rock1
    },
    {
        id:3,
        user:user_list[2],
        user_id:user_list[2].id,
        date:"May 2nd, 2023",
        text:"This stunning wolf painting captures the essence of the artistic life - a constant struggle to bring your vision to life. As artists, we pour our hearts and souls into our work, facing countless obstacles and setbacks along the way. But despite the challenges, we keep pushing forward, driven by a passion that never fades. And when we finally create something that truly speaks to us, it makes it all worth it.",
        content:paint1
    },
    {
        id:4,
        user:user_list[4],
        user_id:user_list[4].id,
        date:"May 3rd, 2023",
        text:"Hello Ladies! Looking for a date in iiu, Im currently single but ready to mingle, so if anyone is intrested DM me, They don't call me a Lady Killer for no reason. #sad #desperate #heavilySingle #pleaseDM-ImBegging #LadyKiller #khariyan Londa #sakht Londa",
        content:iiu
    },
    {
        id:5,
        user:User,
        user_id:User.id,
        date:"May 07, 2023",
        text:"Exciting news! As a co-founder, tralized, I'm Finally Here! #Web3Twitter #Decentralized #Blockchain #Crypto",
        content:User.banner
    },
    {
        id:6,
        user:User,
        user_id:User.id,
        date:"May 07, 2023",
        text:"Yeah Baby! That's What I've been waiting for.",
        content:null
    },
];