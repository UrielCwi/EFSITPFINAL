import EventLocationRepository from "../repositories/eventlocation-repository.js";
const eventLocationRepository = new EventLocationRepository();
export default class EventLocationService {
    async getEventLocations(limit, offset){
        try {
            return await eventLocationRepository.getEventLocations(limit, offset);
        } catch (error) {
            console.error('Error in GetEventLocations:', error);
            throw error;
        }
    }
    async getEventLocationById(id) {
        try {
            const eventLocation = await eventLocationRepository.getEventLocationById(id);
            return eventLocation;
        } catch (error) {
            console.error('Error in getEventLocationById:', error);
            throw error;
        }
    }
    async crearEventLocation(eventLocation){
        try {
            const res = await eventLocationRepository.crearEventLocation(eventLocation);
            return res;
        } catch (error){
            console.error('Error in CrearEventLocation:', error);
            throw error;
        }
    }
    async updateEventLocation(eventLocation){
        try {
            const res = await eventLocationRepository.updateEventLocation(eventLocation);
            return res;
        } catch (error){
            console.error('Error in UpdateEventLocation:', error);
            throw error;
        }
    }
    async deleteEventLocation(id){
        try {
            const res = await eventLocationRepository.deleteEventLocation(id);
            return res;
        } catch (error){
            console.error('Error in DeleteEventLocation:', error);
            throw error;
        }
    }
}
