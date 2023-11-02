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

export default function spaceMembers() {
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
        <Heading title={"Space members: " + settingsToRender?.Space_Name} />
        <Block className={styles["space-settings-section"] + " " + styles["space-members-list"]}>
          <Heading variant="h2" title="Space members" />
          {membersList ? (
            <>
              {membersList && membersList.map((member, i) =>
                <ProfileCard variant="space-settings-member" className={styles["space-member"]} profile={member} key={i} />
              )}
            </>
          ) : (
            <Block>Not any members</Block>
          )}
          <Block className="clear-both"></Block>
        </Block>
        <Block className={styles["space-settings-section"] + " " + styles["space-member-roles"]}>
          <Heading variant="h2" title="Member roles" />
          <Text variant="span">Guest, moderator, admin & owner</Text>
        </Block>
      </Block>
    </Block>
  )
}