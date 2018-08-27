import React, { Component } from "react";
import PropTypes from 'prop-types'

import Header from '../components/Header'
import SettingsToggleItem from '../components/SettingsToggleItem'

class Settings extends Component {
    static propTypes = {
        onGoBack: PropTypes.func.isRequired,
        onActivateCompactMode: PropTypes.func.isRequired,
        onDeactivateCompactMode: PropTypes.func.isRequired,
        onActivateNightMode: PropTypes.func.isRequired,
        onDeactivateNightMode: PropTypes.func.isRequired,

        isCompactMode: PropTypes.func.isRequired,
        isNightMode: PropTypes.func.isRequired,
    }

    getSettings = () => {
        const {
            isNightMode,
            isCompactMode,
            onActivateCompactMode,
            onDeactivateCompactMode,
            onActivateNightMode,
            onDeactivateNightMode,
        } = this.props

        return [
            {
                type: 'parent',
                title: (
                    <div className="search__title flex" style={{width: 'calc(100% - 3em)', padding: '1em 1.5em', color: 'rgba(255, 255, 255, 0.7)', background:'#503396'}}>
                        <span className="flexbox__elastic">User interface</span>
                    </div>
                ),
                children: [
                    {
                        type: 'child',
                        component: (
                            <SettingsToggleItem
                                key='night'
                                text='Night mode'
                                icon='icon-brightness_2'
                                isToggle={isNightMode}
                                onToggleState={() => {
                                    isNightMode()
                                        ? onDeactivateNightMode()
                                        : onActivateNightMode()
                                }}
                            />
                        )
                    },
                    {
                        type: 'child',
                        component: (
                            <SettingsToggleItem
                                key='compact'
                                text='Compact mode'
                                icon='icon-view_day'
                                isToggle={isCompactMode}
                                onToggleState={() => {
                                    isCompactMode()
                                        ? onDeactivateCompactMode()
                                        : onActivateCompactMode()
                                }}
                            />
                        )
                    }
                ]
            }
        ]
    }

    render() {
        const {
        	onGoBack,
        } = this.props

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
                        const title = parent.title
                        const children = (
                            <div>
                                {parent.children.map(child => child.component)}
                            </div>
                        )

                        return (
                            <div>
                                {title}
                                {children}
                            </div>
                        )
                    })}
		        </div>
	        </div>
        )
    }
}

export default Settings
