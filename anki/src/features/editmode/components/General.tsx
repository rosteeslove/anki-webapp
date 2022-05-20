import { ButtonSwitch } from "components/ButtonSwitch"
import { PlainInput } from "./PlainInput"
import { Decky } from "./Decky"

const General = () => {
    return(
        <>
            <div className="general-deckname-container">
                deck name:
                <PlainInput height={40} width={240}/>
            </div>
            <div className="general-color-container">
                deck color:
                <PlainInput height={40} width={240} children={
                    <div className="shadow-in-top" style={{
                        width: 32,
                        height: 32,
                        backgroundColor: '#F594C3',
                        borderRadius: 16,
                        transform: 'translate(-40px)'
                    }}/>}
                />
            </div>
            <div className="general-preview-container">
                preview:
                <Decky name={'Spanish'} color={'#F594C3'}/>
            </div>
            <div style={{
                display: 'flex',
                flexGrow: 1,
            }}/>
            <div className="general-private-public-container">
                <ButtonSwitch is_on={true} text={'private'} height={32} width={120} fontSize={16}/>
                <ButtonSwitch is_on={false} text={'public'} height={32} width={120} fontSize={16}/>
            </div>
        </>
    )
}

export { General }