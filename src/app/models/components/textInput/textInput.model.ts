import { DisplayProperty } from '../../style/displayProperty';
import { SizeProperty } from '../../style/sizeProperty';
import { BackgroundImageProperty } from '../../style/backgroundImageProperty';
import { PaddingProperty } from '../../style/paddingProperty';
import { BorderProperty } from '../../style/borderProperty';
import { BorderRadiusProperty } from '../../style/borderRadiusProperty';
import { MarginProperty } from '../../style/marginProperty';
import { TextInputTypographyProperty } from '../../style/textInput/TextInputTypographyProperty';

export class TextInput {
    display : DisplayProperty;
    typography: TextInputTypographyProperty;
    size : SizeProperty;
    margin : MarginProperty;
    padding : PaddingProperty;
    border : BorderProperty;
    borderRadius : BorderRadiusProperty;
    backgroundImage : BackgroundImageProperty
}