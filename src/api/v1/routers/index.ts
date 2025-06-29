import express from "express";
import {AuthRoutes } from './AuthRoute/Auth.route';
import { ProfileRoute } from "./AuthRoute/ProfileRouter/Profile.route";
import { AvailabilityRouter } from "./AvailabilityRouter/Availability.route";
import { AppointmentRouter } from "./AppointmentRouter/Appointment.route";
import { UserRoute } from "./UserRouter/User.route";

const router = express.Router();

/* Auth ROutes */
router.use('/auth', AuthRoutes);
router.use('/profile', ProfileRoute);
router.use('/user', UserRoute);
router.use('/availability', AvailabilityRouter);
router.use('/appointment', AppointmentRouter);

export { router as routes };
