import React, { Component } from "react";
import PropTypes from 'prop-types'

import Header from '../components/Header'
import SettingsToggleItem from '../components/SettingsToggleItem'

class Settings extends Component {
    static propTypes = {
        onGoBack: PropTypes.func.isRequired,
        settings: PropTypes.object.isRequired,
        onActivateCompactMode: PropTypes.func.isRequired,
        onDeactivateCompactMode: PropTypes.func.isRequired,
        onActivateNightMode: PropTypes.func.isRequired,
        onDeactivateNightMode: PropTypes.func.isRequired,
    }

    getSettings = () => {
        const {
            settings,
            onActivateCompactMode,
            onDeactivateCompactMode,
            onActivateNightMode,
            onDeactivateNightMode,
            onActivateInfiniteScroll,
            onDeactivateInfiniteScroll,
        } = this.props

        const compactMode =
            {
                type: 'child',
                component: (
                    <SettingsToggleItem
                        key='compact'
                        text='Compact mode'
                        icon='icon-view_day'
                        isActivated={settings.compactMode}
                        onToggleState={() => {
                            settings.compactMode
                                ? onDeactivateCompactMode()
                                : onActivateCompactMode()
                        }}
                    />
                )
            }

        const infiniteScroll =
            {
                type: 'child',
                component: (
                    <SettingsToggleItem
                        key='infinite'
                        text='Infinite scroll'
                        icon='icon-infinite'
                        isActivated={settings.infiniteScroll}
                        onToggleState={() => {
                            settings.infiniteScroll
                                ? onDeactivateInfiniteScroll()
                                : onActivateInfiniteScroll()
                        }}
                    />
                )
            }

        const nightMode = 
            {
                type: 'child',
                component: (
                    <SettingsToggleItem
                        key='night'
                        text='Night mode'
                        icon='icon-brightness_2'
                        isActivated={settings.nightMode}
                        onToggleState={() => {
                            settings.nightMode
                                ? onDeactivateNightMode()
                                : onActivateNightMode()
                        }}
                    />
                )
            }

        return [
            {
                type: 'parent',
                title: (
                    <div className="search__title flex" style={{width: 'calc(100% - 3em)', padding: '1em 1.5em', color: 'rgba(255, 255, 255, 0.7)', background:'#503396'}}>
                        <span className="flexbox__elastic">User interface</span>
                    </div>
                ),
                children: [
                    compactMode,
                    infiniteScroll,
                    nightMode,
                ]
            }
        ]
    }

    render() {
        const { onGoBack, } = this.props

        return (
        	<div className="Page">
	            <Header
                    title='Settings'
                    displaySearch={false}
                    displayGoBack={true}
                    goBack={onGoBack}
                />

		        <div className="container">
                    {this.getSettings().map(parent => {
                        const { title, children } = parent
                        return (
                            <div>
                                {title}
                                {<div>{children.map(child => child.component)}</div>}
                            </div>
                        )
                    })}
		        </div>
	        </div>
        )
    }
}

export default Settings
