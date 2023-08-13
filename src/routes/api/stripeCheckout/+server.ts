import type { RequestHandler } from "@sveltejs/kit";
import Stripe from "stripe";

const SECRET_KEY = " ";
const stripe = new Stripe(SECRET_KEY, {
    apiVersion:"2022-11-15"
})


export const POST: RequestHandler = async({request})=>{
    const data = await request.json();
    const items = data.items;


    let lineItems: any =[];
    items.forEach((item:any) => {
        lineItems.push({price:items.id,quantity:items.quantity})
        
    });

 const session = await stripe.checkout.sessions.create({
    line_items:lineItems,
    mode:'payment',
    success_url:"https://localhost:5173/success",
    cancel_url:"https://localhost:5173/cancel"

 })
 return new Response(
    JSON.stringify({url:session.url}),
    {
        status:200,
        headers:{'content-type':'application/json'}
    }
 )

}