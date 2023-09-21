import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { SuperAdmin, Spoc, UniversityAdmin, Student, Recruiter } from '../models/Roles.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password required"
        });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({
            success: false,
            message: "No user exists with that email ID"
        });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(403).json({
            success: false,
            message: "Invalid credentials"
        });

        let user = null;
        switch (existingUser.role) {
            case "SuperAdmin":
                user = await SuperAdmin.findOne({ email });
                break;
            case "Spoc":
                user = await Spoc.findOne({ email });
                break;
            case "UniversityAdmin":
                user = await UniversityAdmin.findOne({ email });
                break;
            case "Student":
                user = await Student.findOne({ email });
                break;
            case "Recruiter":
                user = await Recruiter.findOne({ email });
                break;
            default:
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong. Profile role cannot be fetched."
                });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1000h' });

        return res.status(200).json({
            success: true,
            data: user,
            token,
            message: "Logged in successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            err
        });
    }
}

export const signup = async (req, res) => {
    
    const { email, password, role } = req.body;
    try {
        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Bad request. \"role\" field not found"
            });
        } 
        // if (role === "SuperAdmin") return res.status(403).json({
        //     success: false,
        //     message: "Super Admins can't be added through api calls."
        // })
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(403).json({
            success: false,
            message: "An account with this email already exists"
        });

        const { confirmPassword, ...rest } = req.body;
        if (password !== confirmPassword) return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        });

        let user = null;
        const hashedPassword = await bcrypt.hash(password, 10);
        switch (role) {
            case "SuperAdmin":
                try {
                    user = await SuperAdmin.create({ ...rest, password: hashedPassword });
                } catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: `Bad Request. Required fields to create a ${role} record not found or are not in correct format.`,
                        err
                    })
                }
                break;
            case "Student":
                try {
                    user = await Student.create({ ...rest, password: hashedPassword, sihGems: 0, popularity: 0, status: "pending", verifiedBy: null });
                } catch (err) {
                    console.log(err);
                    return res.status(400).json({
                        success: false,
                        message: `Bad Request. Required fields to create a ${role} record not found or are not in correct format.`,
                        err
                    })
                }
                break;
            case "UniversityAdmin":
                try {
                    user = await UniversityAdmin.create({ ...rest, password: hashedPassword, status: "pending", verifiedBy: null });
                } catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: `Bad Request. Required fields to create a ${role} record not found or are not in correct format.`,
                        err
                    })
                }
                break;
            case "Spoc":
                try {
                    user = await Spoc.create({ ...rest, password: hashedPassword, status: "pending", verifiedBy: null });
                } catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: `Bad Request. Required fields to create a ${role} record not found or are not in correct format.`,
                        err
                    })
                }
                break;
            case "Recruiter":
                try {
                    user = await Recruiter.create({ ...rest, password: hashedPassword });
                } catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: `Bad Request. Required fields to create a ${role} record not found or are not in correct format.`,
                        err
                    })
                }
                break;
            default: 
                return res.status(400).json({
                    success: false,
                    message: "No such role exists"
                })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1000h' });

        return res.status(200).json({
            success: true,
            data: user,
            token,
            message: "Signed up successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            err
        });
    }
}