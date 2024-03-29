import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { storage } from "utils/storage";
import { RefreshTokenExpirationError, NotFoundError } from "types";
import { ThemeContext } from "context";
import { ButtonSwitch } from "components/ButtonSwitch";
import { getDeckInfo, removeDeck } from "../api";
import { DeckInfoType } from "types";
import "./styles/DeckInfo.scss";
import { MiddleGroundPanel } from "components";


const DeckInfo = () => {
    const [theme, ] = useContext(ThemeContext);

    const [deckInfo, setDeckInfo] = useState<DeckInfoType>();
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [isMyDeckInfo, setIsMyDeckInfo] = useState<boolean>(false);
    const [subDeckInfo, setSubDeckInfo] = useState<string>('description');

    const { username, deckname } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDeckInfo(username!, deckname!)
            .then(data => {
                setDeckInfo(data.deckinfo);
                const clientUsername = storage.getUsername();
                if (clientUsername) {
                    setIsSignedIn(true);
                }
                if (clientUsername === username) {
                    setIsMyDeckInfo(true);
                }
            })
            .catch((error) => {
                if (error instanceof NotFoundError) {
                    navigate(`/${username}`);
                } else if (error instanceof RefreshTokenExpirationError) {
                    navigate('/auth/login');
                } else {
                    console.log('Unhandled error:');
                    console.log(error);
                }
            });
    }, [username, deckname, navigate]);

    return(
        <>
            {
                deckInfo &&
                <MiddleGroundPanel className='shadow-out-bottom deckinfo'>
                    <div className='shadow-in-top-light inner-shadow-maker'/>
                    <div className="deckname-holder">
                        { deckInfo && deckInfo.name }
                        <div className='deckinfo-closer'>
                            <Link style={{
                                color: theme.text,
                            }} to={`/${username}`}>×</Link>
                        </div>
                    </div>
                    <div className="mode-buttons-holder">
                        <ButtonSwitch is_on={subDeckInfo === 'description'}
                                      text={'description'}
                                      width={'var(--button-width)'}
                                      height={'var(--button-height)'}
                                      fontSize={14}
                                      onClick={() => {
                                          setSubDeckInfo('description');
                                      }}/>
                        <ButtonSwitch is_on={subDeckInfo === 'stats'}
                                      text={'stats'}
                                      width={'var(--button-width)'}
                                      height={'var(--button-height)'}
                                      fontSize={14}
                                      onClick={() => {
                                          setSubDeckInfo('stats');
                                      }}/>
                    </div>
                    <div className="deckinfo-main">
                        {
                            subDeckInfo === 'description' &&
                            <div className="deckinfo-description-box">
                                { !!deckInfo && deckInfo.description }
                            </div>
                        }
                        {
                            // todo: provide stats smh
                            subDeckInfo === 'stats' &&
                            <div style={{
                                padding: 30,
                                boxSizing: "border-box",
                                fontSize: 18,
                                animation: 'fade 100ms linear',
                            }}>
                                dunno how to present stats yet ._.
                            </div>
                        }
                    </div>
                    <div className="bottom-clippy" style={{
                        backgroundColor: deckInfo?.color,
                    }}>
                        <div className="deckinfo-card-number">
                            {`${deckInfo.card_number} card${deckInfo.card_number % 10 === 1 ? '' : 's'}`}
                        </div>
                        <div className="deckinfo-action-button-group">
                            { isMyDeckInfo &&
                                <>
                                    <Link to={`/${username}/${deckname}/edit`} className='deckinfo-action-button edit-button'/>
                                    <button onClick={() => {
                                        removeDeck(username!, deckname!)
                                            .then(() => {
                                                navigate(`/${username}`);
                                            });
                                    }} className='deckinfo-action-button remove-button'/>
                                </>
                            }
                            <Link to={isSignedIn ? `/${username}/${deckname}/train` : '/auth/login'} className='deckinfo-action-button play-button'/>
                        </div>
                    </div>
                </MiddleGroundPanel>
            }
        </>
    );
};

export { DeckInfo };
