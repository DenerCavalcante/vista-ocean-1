import { useContext } from 'react'
import { useRouter } from 'next/router'
import styles from '../stylesBuyButton.modules.css'
import AuthContext from '../context/AuthContext'

export default function BuyButton () {
  const { user } = useContext(AuthContext)

  const redirectToLogin =
router.push('/login')
  return (
    <>
        {!user &&
            <button
                className={styles.buy}
                onclick={redirectToLogin}
            >
                Login to Buy
            </button>
        }
    </>
  )
}
