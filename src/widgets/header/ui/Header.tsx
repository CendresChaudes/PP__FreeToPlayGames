import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout, Button, Divider, Row, Col } from 'antd';
import { redirectToRoute, useAppDispatch, useBreakpoint } from '@/shared/lib';
import { Logo } from '@/shared/ui';
import styles from './styles.module.css';
import { AppRoute } from '@/const';

type HeaderProps = {
  hasReturnButton?: boolean;
};

const { Header: _Header } = Layout;

export function Header({ hasReturnButton = true }: HeaderProps) {
  const dispatch = useAppDispatch();
  const currentBreakpoint = useBreakpoint();

  return (
    <>
      <_Header className={styles.header}>
        <Row className={styles.row} align="middle">
          <Col xs={{ span: hasReturnButton ? 4 : 0 }} sm={{ span: 8 }}>
            {hasReturnButton && (
              <Button
                type="primary"
                shape="round"
                icon={<ArrowLeftOutlined />}
                aria-label="Return"
                onClick={() => {
                  dispatch(redirectToRoute(AppRoute.Root));
                }}
              >
                {currentBreakpoint !== 'xs' && 'Return'}
              </Button>
            )}
          </Col>

          <Col xs={{ span: hasReturnButton ? 20 : 24 }} sm={{ span: 8 }}>
            <Logo className={styles.logo} />
          </Col>
        </Row>
      </_Header>

      <Divider className={styles.divider} />
    </>
  );
}
