import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); 
const app = express();
app.use(express.json());


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

        res.status(200).json({
            message: 'User created successfully',
            user: newUser,
            userId: newUser.id
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
