import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { useFullNameFieldDisplay } from '@/object-record/record-field/meta-types/hooks/useFullNameFieldDisplay';
import { INLINE_CELL_HOTKEY_SCOPE_MEMOIZE_KEY } from '@/object-record/record-inline-cell/constants/InlineCellHotkeyScopeMemoizeKey';
import { useInlineCell } from '@/object-record/record-inline-cell/hooks/useInlineCell';
import { TitleInputHotkeyScope } from '@/ui/input/types/TitleInputHotkeyScope';
import { usePreviousHotkeyScope } from '@/ui/utilities/hotkey/hooks/usePreviousHotkeyScope';
import { Theme, withTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { isNonEmptyString } from '@sniptt/guards';
import { useContext } from 'react';
import { OverflowingTextWithTooltip } from 'twenty-ui/display';

const StyledDiv = styled.div`
  align-items: center;
  background: inherit;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.primary};
  cursor: pointer;
  overflow: hidden;
  height: 28px;
  padding: ${({ theme }) => theme.spacing(0, 1.25)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background: ${({ theme }) => theme.background.transparent.light};
  }
`;

const StyledEmptyText = withTheme(styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.font.color.tertiary};
`);

export const RecordTitleFullNameFieldDisplay = () => {
  const { fieldDefinition } = useContext(FieldContext);

  const { openInlineCell } = useInlineCell();

  const { fieldValue } = useFullNameFieldDisplay();

  const content = [fieldValue?.firstName, fieldValue?.lastName]
    .filter(isNonEmptyString)
    .join(' ')
    .trim();

  const { setHotkeyScopeAndMemorizePreviousScope } = usePreviousHotkeyScope(
    INLINE_CELL_HOTKEY_SCOPE_MEMOIZE_KEY,
  );
  return (
    <StyledDiv
      onClick={() => {
        setHotkeyScopeAndMemorizePreviousScope(
          TitleInputHotkeyScope.TitleInput,
        );
        openInlineCell();
      }}
    >
      {!content ? (
        <StyledEmptyText>Untitled</StyledEmptyText>
      ) : (
        <OverflowingTextWithTooltip
          text={isNonEmptyString(content) ? content : fieldDefinition.label}
        />
      )}
    </StyledDiv>
  );
};
