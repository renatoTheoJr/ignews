import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripeJs";
import styles from "./styles.module.scss";

interface SubscribeButtonPrice {
    priceId: string;    
}

export function SubscribeButton({priceId} : SubscribeButtonPrice ){
    const {data:session} = useSession();
    async function handleSubscribeButton(){
        if(!session){
            signIn('github');
            return;
        }

        //Criação da checkout session
        try{
            const response = await api.post('/subscribe')
            const {sessionId} = response.data;
            const stripe = getStripeJs();
            (await stripe).redirectToCheckout({sessionId: sessionId})
        }catch(err){
            alert(err.message);
        }
        

    }
    return(
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribeButton}
        >
        Subscribe Now
        </button>
    )
}