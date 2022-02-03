import { useSession, signIn } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonPrice {
    priceId: string;    
}

export function SubscribeButton({priceId} : SubscribeButtonPrice ){
    const {data:session} = useSession();
    function handleSubscribeButton(){
        if(!session){
            signIn('github');
            return;
        }

        //Criação da checkout session
        

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