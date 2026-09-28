import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities';
import { config } from '../config/env';

const userRepository = AppDataSource.getRepository(User);

const signToken = (user: { id: string; role: string }) =>
  jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  } as SignOptions);

const toPublicUser = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
});

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password and phone are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    const existing = await userRepository.findOneBy({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      phone,
      passwordHash
    });
    await userRepository.save(user);

    const token = signToken(user);

    res.status(201).json({
      success: true,
      data: { token, user: toPublicUser(user) },
      message: 'Account created successfully'
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await userRepository.findOneBy({ email });
    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = signToken(user);

    res.status(200).json({
      success: true,
      data: { token, user: toPublicUser(user) },
      message: 'Logged in successfully'
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log in'
    });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({ id: req.user!.id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: toPublicUser(user)
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
};
