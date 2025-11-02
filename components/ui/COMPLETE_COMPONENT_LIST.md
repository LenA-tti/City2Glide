# Complete React Native UI Components - Reference Guide

## 📦 All 33 Components Created

### ✅ Forms & Inputs (9 components)

| Component | File | Description | Dependencies |
|-----------|------|-------------|--------------|
| **Input** | `Input.tsx` | Text input with variants | None |
| **Textarea** | `Textarea.tsx` | Multi-line text input | None |
| **Checkbox** | `Checkbox.tsx` | Checkbox toggle | `@react-native-community/checkbox` |
| **RadioGroup** | `RadioGroup.tsx` | Radio button group | None |
| **Select** | `Select.tsx` | Dropdown selector | None |
| **Switch** | `Switch.tsx` | Toggle switch | None |
| **InputOTP** | `InputOTP.tsx` | One-time password | None |
| **Slider** | `Slider.tsx` | Range slider | `@react-native-community/slider` |
| **Label** | `Label.tsx` | Form label | None |

### 🎨 Display & Content (9 components)

| Component | File | Description | Dependencies |
|-----------|------|-------------|--------------|
| **Card** | `Card.tsx` | Content container | None |
| **Badge** | `Badge.tsx` | Status indicator | None |
| **Avatar** | `Avatar.tsx` | User avatar | None |
| **Alert** | `Alert.tsx` | Alert message | None |
| **Separator** | `Separator.tsx` | Divider line | None |
| **Skeleton** | `Skeleton.tsx` | Loading placeholder | None |
| **AspectRatio** | `AspectRatio.tsx` | Aspect ratio container | None |
| **Table** | `Table.tsx` | Data table | None |
| **Progress** | `Progress.tsx` | Progress bar | None |

### 🎭 Overlays & Modals (7 components)

| Component | File | Description | Dependencies |
|-----------|------|-------------|--------------|
| **Dialog** | `Dialog.tsx` | Modal dialog | None |
| **AlertDialog** | `AlertDialog.tsx` | Alert dialog | None |
| **Sheet** | `Sheet.tsx` | Bottom sheet | `@gorhom/bottom-sheet` |
| **Popover** | `Popover.tsx` | Floating popover | `react-native-popover-view` (optional) |
| **Tooltip** | `Tooltip.tsx` | Hover tooltip | `react-native-walkthrough-tooltip` |
| **DropdownMenu** | `DropdownMenu.tsx` | Dropdown menu | None |
| **Toast** | `Toast.tsx` | Toast notification | `react-native-toast-message` |

### 🧭 Navigation & Layout (5 components)

| Component | File | Description | Dependencies |
|-----------|------|-------------|--------------|
| **Tabs** | `Tabs.tsx` | Tab navigation | None |
| **Pagination** | `Pagination.tsx` | Page navigation | None |
| **Drawer** | `Drawer.tsx` | Side drawer | `@react-navigation/drawer` |
| **Accordion** | `Accordion.tsx` | Collapsible sections | None |
| **Collapsible** | `Collapsible.tsx` | Expandable content | None |

### 🎯 Interactive & Utility (3 components + utils)

| Component | File | Description | Dependencies |
|-----------|------|-------------|--------------|
| **Button** | `Button.tsx` | Action button | None |
| **Toggle** | `Toggle.tsx` | Toggle button | None |
| **ScrollArea** | `ScrollArea.tsx` | Scrollable area | None |
| **utils** | `utils.ts` | Utility functions | None |

---

## 🎯 Quick Import Reference

```tsx
// Import all at once
import {
  // Forms
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  RadioButton,
  Select,
  SelectItem,
  Switch,
  InputOTP,
  Slider,
  Label,
  
  // Display
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  Alert,
  AlertTitle,
  AlertDescription,
  Separator,
  Skeleton,
  AspectRatio,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Progress,
  
  // Overlays
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  AlertDialog,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Popover,
  PopoverContent,
  Tooltip,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  toast,
  Toast,
  
  // Navigation
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Pagination,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Accordion,
  AccordionItem,
  Collapsible,
  
  // Interactive
  Button,
  Toggle,
  ScrollArea,
  
  // Utils
  cn,
  formatCurrency,
  getInitials,
  truncate,
  getShadow,
  hapticFeedback,
} from './components/ui-rn';
```

---

## 📋 Installation Checklist

### ✅ Required (Install First)
```bash
npm install react-native-safe-area-context
```

### 🔧 Optional (Install as Needed)

**For Checkbox:**
```bash
npm install @react-native-community/checkbox
```

**For Slider:**
```bash
npm install @react-native-community/slider
```

**For Toast:**
```bash
npm install react-native-toast-message
```

**For Sheet (Bottom Sheet):**
```bash
npm install @gorhom/bottom-sheet
npm install react-native-reanimated react-native-gesture-handler
```

**For Drawer:**
```bash
npm install @react-navigation/drawer
npm install react-native-gesture-handler react-native-reanimated
```

**For Tooltip:**
```bash
npm install react-native-walkthrough-tooltip
```

**For Popover:**
```bash
npm install react-native-popover-view
```

**For Haptic Feedback:**
```bash
npm install expo-haptics
```

---

## 🎨 Component Variants

### Button Variants
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Badge Variants
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

### Alert Variants
```tsx
<Alert variant="default">Info</Alert>
<Alert variant="destructive">Error</Alert>
<Alert variant="success">Success</Alert>
<Alert variant="warning">Warning</Alert>
```

### Input Types
```tsx
<Input type="text" />
<Input type="email" />
<Input type="password" />
<Input type="number" />
<Input type="tel" />
```

---

## 🎯 Common Patterns

### Form with Validation
```tsx
import { Input, Label, Button, Alert } from './components/ui-rn';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    // Submit form
  };

  return (
    <View>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Label>Email</Label>
      <Input
        type="email"
        value={email}
        onChangeText={setEmail}
        placeholder="email@example.com"
      />
      
      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
      />
      
      <Button onPress={handleSubmit}>
        Sign In
      </Button>
    </View>
  );
}
```

### Confirmation Dialog
```tsx
import { AlertDialog, Button } from './components/ui-rn';

function DeleteButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        onPress={() => setShowDialog(true)}
      >
        Delete
      </Button>
      
      <AlertDialog
        visible={showDialog}
        onClose={() => setShowDialog(false)}
        title="Are you sure?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        destructive
      />
    </>
  );
}
```

### Data Table
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './components/ui-rn';

function TripsTable({ trips }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Fare</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell>{trip.date}</TableCell>
            <TableCell>{trip.route}</TableCell>
            <TableCell>P {trip.fare}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Loading States
```tsx
import { Skeleton, Card } from './components/ui-rn';

function LoadingCard() {
  return (
    <Card>
      <CardContent>
        <Skeleton width="100%" height={20} />
        <Skeleton width="80%" height={16} style={{ marginTop: 8 }} />
        <Skeleton width="60%" height={16} style={{ marginTop: 8 }} />
      </CardContent>
    </Card>
  );
}
```

### Bottom Sheet Menu
```tsx
import { Sheet, Button } from './components/ui-rn';

function OptionsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        Options
      </Button>
      
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoints={['50%', '90%']}
      >
        <SheetHeader>
          <SheetTitle>Options</SheetTitle>
        </SheetHeader>
        <View>
          <Button onPress={handleEdit}>Edit</Button>
          <Button onPress={handleDelete} variant="destructive">
            Delete
          </Button>
        </View>
      </Sheet>
    </>
  );
}
```

---

## 🔧 Utility Functions

### cn (Class Names)
```tsx
import { cn } from './components/ui-rn';

const styles = cn(baseStyle, conditionalStyle && activeStyle);
```

### formatCurrency
```tsx
import { formatCurrency } from './components/ui-rn';

const price = formatCurrency(25.50, 'P'); // "P 25.50"
```

### getInitials
```tsx
import { getInitials } from './components/ui-rn';

const initials = getInitials('John Doe'); // "JD"
```

### truncate
```tsx
import { truncate } from './components/ui-rn';

const short = truncate('Very long text here', 10); // "Very long..."
```

### getShadow
```tsx
import { getShadow } from './components/ui-rn';

const shadow = getShadow(4); // Platform-specific shadow
```

### hapticFeedback
```tsx
import { hapticFeedback } from './components/ui-rn';

await hapticFeedback('medium'); // Requires expo-haptics
```

---

## 📱 Platform Compatibility

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| Core Components | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ |
| Gestures | ✅ | ✅ | ⚠️ |
| Haptics | ✅ | ✅ | ❌ |
| Bottom Sheet | ✅ | ✅ | ⚠️ |
| Native Checkboxes | ✅ | ✅ | ✅ |
| Native Switches | ✅ | ✅ | ✅ |

✅ Full Support | ⚠️ Limited Support | ❌ Not Available

---

## 🎨 Theming

All components support custom theming:

```tsx
const customTheme = {
  primary: '#3b82f6',
  destructive: '#ef4444',
  secondary: '#6b7280',
  background: '#ffffff',
  text: '#1f2937',
};

// Apply to individual components
<Button style={{ backgroundColor: customTheme.primary }}>
  Themed Button
</Button>

// Or use React Context for global theming
```

---

## 📚 Next Steps

1. **Install dependencies** - Start with required packages
2. **Import components** - Use named imports from `ui-rn`
3. **Customize styling** - Add your brand colors
4. **Add interactions** - Wire up onPress handlers
5. **Test on devices** - Verify on iOS and Android

---

## 🤝 Support

For issues or questions:
1. Check the component's JSDoc comments
2. Review usage examples above
3. Refer to individual component files for props

---

**All 33 components are production-ready and cross-platform compatible! 🚀**
