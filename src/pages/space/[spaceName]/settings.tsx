// External
import { useEffect, useState } from 'react'
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

// Internal
import { Block, Text, Heading, Field, SelectField, Profile as ProfileCard, AccessSpace } from '@/components'
import { SpaceDTO, ChannelDTO } from '@/types'
import styles from '@/core-ui/styles/modules/SpaceSettings.module.scss'
import { useSpaces } from '@/hooks'
import {
  useTypedSelector,
  selectTheSpace,
  selectMembersList,
  selectChannelsList
} from '@/redux'

export default function SpaceSettings() {
  // Hooks
  const { theSpace, readSpace, membersList, channelsList } = useSpaces()

  // Internal variables
  const [selectItems, setSelectItems] = useState<any[]>([])
  const [adminTextChannel, setAdminTextChannel] = useState<number | string>('')
  const [rulesTextChannel, setRulesTextChannel] = useState<number | string>('')
  const [channelLanguage, setChannelLanguage] = useState<string>('')
  const [printAdminChannelName, setPrintAdminChannelName] = useState<string>('')
  const [printRulesChannelName, setPrintRulesChannelName] = useState<string>('')
  const languages = [
    {
      "value": "da-DK",
      "title": "Dansk"
    },
    {
      "value": "en-GB",
      "title": "English"
    },
  ]

  // Methods
  const handleAdminChannel = (event: SelectChangeEvent) => setAdminTextChannel(parseInt(event.target.value))
  const handleRulesChannel = (event: SelectChangeEvent) => setRulesTextChannel(parseInt(event.target.value))
  const handlePrimaryLanguage = (event: SelectChangeEvent) => setChannelLanguage(event.target.value)

  const filterSelectItem = (value: number | string, setFunction: Function) => {
    const item: any = selectItems.filter((item: any, i) => item.value == value)
    if (item.length) setFunction(item[0].title)
  }

  useEffect(() => {
    if (adminTextChannel) filterSelectItem(adminTextChannel, setPrintAdminChannelName)
    if (rulesTextChannel) filterSelectItem(rulesTextChannel, setPrintRulesChannelName)
  }, [adminTextChannel, rulesTextChannel]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!theSpace.Space_Name) readSpace()
  }, [theSpace]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (channelsList['text'].length) {
      const tempItems: { value: number; title: string; }[] = []
      channelsList['text'].map((channel: ChannelDTO, i) => {
        const item = { "value": channel.Channel_ID, "title": channel.Channel_Name }
        tempItems.push(item)
      })
      setSelectItems([...tempItems])
    }
  }, [channelsList])

  return (
    <Block className="other-pages-wrapper">
      <Block className={"other-pages-inner " + styles["space-settings"]}>
        <AccessSpace membersList={membersList} access={4}>
          <Heading title={"Space settings: " + theSpace?.Space_Name} />
          <Block className={"page-section " + styles["space-public-private"]}>
            <Heading variant="h2" title="Public/private settings" />
            <Block>
              Public invite url
              <Field
                type="text"
                lbl=""
                displayLabel={false}
                innerLabel={false}
                value={"https://"}
                onChange={() => 0}
                disabled={true}
                className="login-field"
              />
            </Block>
          </Block>
          <Block className={"page-section " + styles["space-community-settings"]}>
            <Heading variant="h2" title="Community settings" />
            {selectItems.length ? (
              <>
                {selectItems.length && (
                  <Block className={styles["space-settings-rule"] + " " + styles["space-rules-channel"]}>
                    {channelsList['text'].length && (
                      <SelectField
                        lbl="rules-text-channel"
                        title="Rules/guidelines channel"
                        value={rulesTextChannel}
                        items={selectItems}
                        onChange={(e: any) => handleRulesChannel}
                        disabled={false}
                      />
                    )}
                    Valgt: {printRulesChannelName ? printRulesChannelName : '-'}
                  </Block>
                )}
                {selectItems.length && (
                  <Block className={styles["space-settings-rule"] + " " + styles["space-admin-channel"]}>
                    {channelsList['text'].length && (
                      <SelectField
                        lbl="admin-only-text-channel"
                        title="Admin-only text channel"
                        value={adminTextChannel}
                        items={selectItems}
                        onChange={(e: any) => handleAdminChannel}
                        disabled={false}
                      />
                    )}
                    Valgt: {printAdminChannelName ? printAdminChannelName : '-'}
                  </Block>
                )}
              </>
            ) : (
              <Block className={styles["space-settings-rule"]}>No channels to use for settings</Block>
            )}
            {languages.length && (
              <Block className={styles["space-settings-language"] + " " + styles["space-primary-language"]}>
                {languages.length && (
                  <SelectField
                    lbl="space-language"
                    title="Primary language"
                    value={channelLanguage}
                    items={languages}
                    onChange={(e: any) => handlePrimaryLanguage}
                    disabled={false}
                  />
                )}
                Valgt: {channelLanguage ? channelLanguage : '-'}
              </Block>
            )}
          </Block>
        </AccessSpace>
      </Block>
    </Block>
  )
}