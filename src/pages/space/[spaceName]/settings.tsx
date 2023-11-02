// External
import { useEffect, useState } from 'react'

// Internal
import { Block, Text, Heading, Field, Profile as ProfileCard } from '@/components'
import { SpaceDTO } from '@/types'
import styles from '@/core-ui/styles/modules/SpaceSettings.module.scss'
import {
  useTypedSelector,
  selectTheSpace,
  selectMembersList
} from '@/redux'

export default function spaceSettings() {
  // Internal variables
  const [settingsToRender, setSettingsToRender] = useState<SpaceDTO>()

  // Redux
  const theSpace = useTypedSelector(selectTheSpace)
  const membersList = useTypedSelector(selectMembersList)

  useEffect(() => {
    setSettingsToRender(theSpace)
  }, [theSpace])

  return (
    <Block className="other-pages-wrapper">
      <Block className={"other-pages-inner " + styles["space-settings"]}>
        <Heading title={"Space settings: " + settingsToRender?.Space_Name} />
        <Block className={styles["space-settings-section"] + " " + styles["space-public-private"]}>
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

        <Block className={styles["space-settings-section"] + " " + styles["space-community-settings"]}>
          <Heading variant="h2" title="Community settings" />
          <Block>
            Rules/guidelines channel
          </Block>
          <Block>
            Admin-only channel
          </Block>
          <Block>
            Primary language
          </Block>
        </Block>
      </Block>
    </Block>
  )
}