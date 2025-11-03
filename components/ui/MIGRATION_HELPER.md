# Web to React Native Component Migration Helper

## 🔄 Quick Migration Reference

This guide helps you quickly migrate from web Shadcn components to React Native equivalents.

---

## 📋 Component Name Mapping

All components have the **same name** between web and RN versions. Just change the import path:

```tsx
// Before (Web)
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

// After (React Native)
import { Button, Card, Input } from '../ui-rn';
```

---

## 🔧 Prop Changes Required

### Button
```tsx
// Web
<Button onClick={handleClick}>Click</Button>

// React Native
<Button onPress={handleClick}>Click</Button>
```

### Input
```tsx
// Web
<Input onChange={(e) => setValue(e.target.value)} />

// React Native
<Input onChangeText={setValue} />
```

### Checkbox
```tsx
// Web
<Checkbox checked={isChecked} onCheckedChange={setIsChecked} />

// React Native (same!)
<Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
```

### Switch
```tsx
// Web
<Switch checked={enabled} onCheckedChange={setEnabled} />

// React Native (same!)
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

---

## 🎨 Styling Changes

### className → style

```tsx
// Web
<Card className="p-4 mb-2 bg-white rounded-lg">

// React Native
<Card style={{ 
  padding: 16, 
  marginBottom: 8, 
  backgroundColor: '#fff',
  borderRadius: 8 
}}>
```

### Common Class Conversions

| Web className | RN style |
|---------------|----------|
| `p-4` | `{ padding: 16 }` |
| `px-4` | `{ paddingHorizontal: 16 }` |
| `py-4` | `{ paddingVertical: 16 }` |
| `m-4` | `{ margin: 16 }` |
| `mb-2` | `{ marginBottom: 8 }` |
| `rounded-lg` | `{ borderRadius: 8 }` |
| `bg-white` | `{ backgroundColor: '#fff' }` |
| `text-gray-500` | `{ color: '#6b7280' }` |
| `flex` | `{ display: 'flex' }` |
| `flex-row` | `{ flexDirection: 'row' }` |
| `items-center` | `{ alignItems: 'center' }` |
| `justify-between` | `{ justifyContent: 'space-between' }` |
| `w-full` | `{ width: '100%' }` |
| `h-full` | `{ height: '100%' }` |

---

## 📱 Component-Specific Migrations

### Accordion
```tsx
// Web
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>

// React Native
<Accordion type="single">
  <AccordionItem title="Title">
    <Text>Content</Text>
  </AccordionItem>
</Accordion>
```

### AlertDialog
```tsx
// Web
<AlertDialog>
  <AlertDialogTrigger>
    <Button>Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogAction>Confirm</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>

// React Native
const [open, setOpen] = useState(false);

<Button onPress={() => setOpen(true)}>Delete</Button>

<AlertDialog
  visible={open}
  onClose={() => setOpen(false)}
  title="Are you sure?"
  confirmText="Confirm"
  onConfirm={handleConfirm}
/>
```

### Dialog
```tsx
// Web
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>

// React Native
const [open, setOpen] = useState(false);

<Button onPress={() => setOpen(true)}>Open</Button>

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### DropdownMenu
```tsx
// Web
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

// React Native
<DropdownMenu
  trigger={<Button>Options</Button>}
>
  <DropdownMenuItem onPress={handleEdit}>Edit</DropdownMenuItem>
  <DropdownMenuItem onPress={handleDelete}>Delete</DropdownMenuItem>
</DropdownMenu>
```

### Select
```tsx
// Web
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// React Native (same structure!)
<Select value={value} onValueChange={setValue}>
  <SelectItem value="option1" label="Option 1" />
  <SelectItem value="option2" label="Option 2" />
</Select>
```

### Tabs
```tsx
// Web
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// React Native (same!)
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Toast
```tsx
// Web
import { toast } from 'sonner';
toast.success('Success!');

// React Native
import { toast, Toast } from '../ui-rn';

// In App.tsx
<Toast />

// Anywhere in app
toast.success('Success!', 'Description');
```

---

## 🔍 Common Patterns

### Form Validation
```tsx
// Web
const form = useForm();

// React Native
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value) => {
  if (!value) {
    setEmailError('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    setEmailError('Invalid email');
  } else {
    setEmailError('');
  }
};

<Input
  value={email}
  onChangeText={(text) => {
    setEmail(text);
    validateEmail(text);
  }}
  error={emailError}
/>
```

### Loading States
```tsx
// Web
{isLoading ? <Skeleton /> : <Content />}

// React Native (same!)
{isLoading ? <Skeleton width="100%" height={20} /> : <Content />}
```

### Conditional Rendering
```tsx
// Web
{showDialog && <Dialog>...</Dialog>}

// React Native (same!)
{showDialog && <Dialog>...</Dialog>}

// Or use visible prop
<Dialog visible={showDialog} onClose={() => setShowDialog(false)}>
```

---

## ⚠️ Important Differences

### 1. No Trigger Components

Many web components use separate Trigger components. In RN, use state instead:

```tsx
// ❌ Web pattern (doesn't work in RN)
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
</Dialog>

// ✅ RN pattern (use state)
const [open, setOpen] = useState(false);
<Button onPress={() => setOpen(true)}>Open</Button>
<Dialog visible={open} onClose={() => setOpen(false)} />
```

### 2. Event Handlers

```tsx
// ❌ Web
onClick, onChange, onSubmit

// ✅ RN
onPress, onChangeText, no onSubmit (use Button onPress)
```

### 3. Styling

```tsx
// ❌ Web
className="p-4 bg-white"

// ✅ RN
style={{ padding: 16, backgroundColor: '#fff' }}
```

### 4. Layout

```tsx
// ❌ Web
<div>, <span>, <p>

// ✅ RN
<View>, <Text>, <Text>
```

---

## 📝 Migration Checklist

For each screen/component:

- [ ] Change imports from `../ui/*` to `../ui-rn`
- [ ] Replace `onClick` with `onPress`
- [ ] Replace `onChange` with `onChangeText`
- [ ] Convert `className` to `style` objects
- [ ] Replace `<div>` with `<View>`
- [ ] Replace `<span>`, `<p>` with `<Text>`
- [ ] Remove Trigger components, use state
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on physical device

---

## 🚀 Quick Migration Steps

1. **Find & Replace**:
   - `'../ui/` → `'../ui-rn'`
   - `onClick={` → `onPress={`
   - `onChange={(e) => set` → `onChangeText={set`

2. **Manual Updates**:
   - Convert className to style
   - Add state for dialogs/modals
   - Replace div/span with View/Text

3. **Test**:
   - Run on iOS
   - Run on Android
   - Fix any style issues

---

## 💡 Pro Tips

1. **Start with simple components** (Button, Input) before complex ones (Dialog, Sheet)
2. **Keep web version** until RN version is tested
3. **Use TypeScript** for better error catching
4. **Test incrementally** - migrate one screen at a time
5. **Use console.log** to debug event handlers

---

## 🎯 Example Full Migration

### Before (Web)
```tsx
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { toast } from 'sonner';

function LoginScreen() {
  const [email, setEmail] = useState('');
  
  return (
    <div className="p-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button 
            className="w-full"
            onClick={() => toast.success('Logged in!')}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### After (React Native)
```tsx
import { View } from 'react-native';
import { Button, Card, CardHeader, CardTitle, CardContent, Input, toast } from '../ui-rn';

function LoginScreen() {
  const [email, setEmail] = useState('');
  
  return (
    <View style={{ padding: 16 }}>
      <Card style={{ maxWidth: 384 }}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent style={{ gap: 16 }}>
          <Input
            type="email"
            placeholder="Email"
            onChangeText={setEmail}
          />
          <Button 
            style={{ width: '100%' }}
            onPress={() => toast.success('Logged in!')}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
```

---

**That's it! You're ready to migrate your components! 🚀**
