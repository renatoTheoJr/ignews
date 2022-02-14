import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripeJs";
import styles from "./styles.module.scss";

interface SubscribeButtonPrice {
    priceId: string;    
}

export function SubscribeButton({priceId} : SubscribeButtonPrice ){
    const {data:session} = useSession();
    const router = useRouter();
    async function handleSubscribeButton(){
        if(!session){
            signIn('github');
            return;
        }
        if(session.activeSubscription){
            router.push('/posts')
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