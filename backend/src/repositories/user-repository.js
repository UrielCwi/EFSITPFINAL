import pg from "pg";
import { BDConfig } from "../BD/bd.js";
import { createToken } from "../utils/token.js";

const client = new pg.Client(BDConfig);
client.connect();

export default class UserRepository {
    async LoginUsuario(username, password){
        try{
            var query = `SELECT id, username, isAdmin FROM Users WHERE username = '${username}' AND password = '${password}'`
            const {rows} = await client.query(query);
            console.log(rows)
            if(rows != null){
                const objeto = createToken(rows);
                return objeto;
            }
            else{
                return null;
            }
        } catch (error){
            console.log(error);
        }
        
    }
    async RegisterUsuario(first_name, last_name, username, password){
        try{
            var query = `INSERT INTO Users (first_name, last_name, username, password, isAdmin) VALUES ('${first_name}', '${last_name}', '${username}', '${password}', 'false') RETURNING id, isAdmin`
            const value = await client.query(query);
            console.log(value)
            return value;
        } catch (error){
            console.log(error);
        }
    }
}
