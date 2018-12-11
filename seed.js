import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Owner from './server/models/owner';
import Appointment from './server/models/appointment';
import Pet from './server/models/pet';
import PetType from './server/models/pet-type';
import Vet from './server/models/vet';
import VetSpecialty from './server/models/vet-specialty';
import User from './server/models/user';

import Users from './server/data/users';
import Owners from './server/data/owners';
import PetTypes from './server/data/pettypes';
import VetSpecialties from './server/data/vetspecialties';
import Vets from './server/data/vets';

dotenv.config();

const {NODE_ENV, PORT, MONGODB_HOST, MONGODB_PASS, MONGODB_USER} = process.env;

mongoose.connect(MONGODB_HOST, {
    useNewUrlParser: true,
    user: MONGODB_USER,
    pass: MONGODB_PASS,
}).then(() => {
    Promise.all([
        Owner.deleteMany({}, () => {
            console.log('Removed Owners');
        }),
        Pet.deleteMany({}, () => {
            console.log('Removed Pets');
        }),
        Appointment.deleteMany({}, () => {
            console.log('Removed Appointments');
        }),
        PetType.deleteMany({}, () => {
            console.log('Removed Pet Types');
        }),
        Vet.deleteMany({}, () => {
            console.log('Removed Vets');
        }),
        VetSpecialty.deleteMany({}, () => {
            console.log('Removed Vet Specialties');
        }),
        User.deleteMany({}, () => {
            console.log('Removed Users');
        }),
    ])
        .then(() => {
            Users.map(user => {
                let newUser = new User();
                newUser.set(user);
                newUser.save(err => {
                    if (err) {
                        console.log(err.toString());
                    } else {
                        console.log(`User ${user.email} inserted successfully`);
                    }
                });
            });
        })
        .then(() => {
            Owners.map(owner => {
                let newOwner = new Owner();
                newOwner.set(owner);
                newOwner.save(err => {
                    if (err) {
                        console.log(err.toString());
                    } else {
                        console.log(`Owner ${owner.firstName} ${owner.lastName} inserted Successfully`);
                    }
                });
            });
        })
        .then(() => {
            PetTypes.map(petType => {
                let newPetType = new PetType();
                newPetType.set(petType);
                newPetType.save(err => {
                    if (err) {
                        console.log(err.toString());
                    } else {
                        console.log(`Pet Type ${petType.name} inserted successfully`);
                    }
                });
            });
        })
        .then(() => {
            VetSpecialties.map(specialty => {
                let newVetSpecialty = new VetSpecialty();
                newVetSpecialty.set(specialty);
                newVetSpecialty.save(err => {
                    if (err) {
                        console.log(err.toString());
                    } else {
                        console.log(`Vet Specialty ${specialty.name} added successfully`);
                    }
                });
            });
        });
});
