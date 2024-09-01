import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'; 
import jwt from 'jsonwebtoken';
import authenticateToken from './auth.js';
import cors from 'cors';

const prisma = new PrismaClient(); 
const app = express();
app.use(express.json());
app.use(cors());

const secret = process.env.JWT_SECRET;

app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if(existingUser){
            return res.status(400).json({
                message: 'User already exits with this username'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const token  = jwt.sign({
            userId: newUser.id
        }, secret, { expiresIn: '1h' });

        res.status(200).json({
            message: 'User created successfully',
            user: newUser,
            userId: newUser.id,
            token: token
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Error creating user',
            error: err.message
        })
    }
});


app.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    try{
        const existingUser = await prisma.user.findUnique({
            where: {
                username
            }
        });
    
        if(!existingUser){
            return res.status(400).json({
                message: 'User not found, please signup'
            })
        }
    
        const authPassword = await bcrypt.compare(password, existingUser.password);
    
        if(!authPassword){
            return res.status(400).json({
                message: 'Invalid password'
            })
        }
    
        res.status(200).json({
            message: 'User signed in successfully',
            userId: existingUser.id 
        })
    }catch(err){
        res.status(500).json({
            message: 'Error signing in',
            error: err.message
        })
    }
})



app.get('/userdata', authenticateToken,  (req, res) => {
    // Dummy data for the dashboard
    const data = {
      recentActivities: [
        { id: 1, activity: 'Logged in', timestamp: Date() },
        { id: 2, activity: 'Viewed profile', timestamp: Date() },
      ],
      statistics: {
        posts: 12,
        followers: 34,
        following: 56,
      },
    };
  
    res.json(data);
  });
  

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
