import {idSection, searchSection} from './controller.js';
import { VacunadosApi } from "../components/Api.js";


let api = new VacunadosApi('http://localhost:3000/');
api.getDocument(4659580).then(data => console.log(data));