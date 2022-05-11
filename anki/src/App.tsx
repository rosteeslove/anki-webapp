import { useContext } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Header } from 'components/Header'
import { ThemeContext } from 'context/ThemeContext'

import { DeckSpace } from 'features/deckspace'
import { EditMode } from 'features/editmode/components/EditMode';

const App = () => {
    const [theme, ] = useContext(ThemeContext)

    return (
        <div id='App' style={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.background,
            display: 'flex',
            flexFlow: 'column',
            transition: 'background-color 100ms'
        }}>
            {/*
                ok, so some docu:
                the header is always there; the status bar probably too ?
                then there's routing:
                - if the URL is invalid, redirect to auth if not auth'd, else to the auth'd user's decks,
                  except when the URL is a subURL of a valid link, then go to the latter
                - /auth: auth, obviously
                - /{username}: {username}'s deckspace, might be yours (if not, showing only public decks)
                - /{username}/{deckname}: accessible deckinfo open over the owner's deckspace with buttons for allowed actions
                - /{username}/{deckname}/train: train mode on an accessible deck; if you're auth'd, your stats will be persisted
                - /{username}/{deckname}/edit: edit mode on your deck
            */}
            <Header/>
            <Router>
                <Routes>
                    <Route path="/" element={<DeckSpace/>}/>
                    <Route path="/rasteeslove" element={<EditMode/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export { App }
