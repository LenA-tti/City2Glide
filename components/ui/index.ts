/**
 * React Native UI Components - Export Index
 * 
 * Complete set of cross-platform UI components for React Native
 * Compatible with iOS, Android, and Web
 */

// Core Components
export { Accordion, AccordionItem } from './Accordion';
export { Alert, AlertDescription, AlertTitle } from './Alert';
export { AlertDialog } from './AlertDialog';
export { AspectRatio } from './AspectRatio';
export { Avatar } from './Avatar';
export { Badge } from './Badge';
export { Button } from './Button';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';
export { Checkbox } from './Checkbox';
export { Collapsible } from './collapsible';
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './Dialog';
export { DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './Drawer';
export { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './DropdownMenu';
export { Input } from './Input';
export { InputOTP } from './InputOTP';
export { Label } from './Label';
export { Pagination } from './Pagination';
export { RNPopover as Popover, PopoverContent, SimplePopover } from './Popover';
export { Progress } from './Progress';
export { RadioGroupItem as RadioButton, RadioGroup } from './RadioGroup';
export { ScrollArea } from './ScrollArea';
export { Select, SelectItem } from './Select';
export { Separator } from './Separator';
export { Sheet, SheetDescription, SheetHeader, SheetTitle } from './Sheet';
export { Skeleton } from './Skeleton';
export { RNSlider as Slider } from './Slider';
export { Switch } from './Switch';
export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
export { Textarea } from './Textarea';
export { Toast, toast } from './Toast';
export { Toggle } from './Toggle';
export { RNTooltip as Tooltip } from './Tooltip';

// Utilities
export * from './utils';

/**
 * Component categories:
 * 
 * FORMS:
 * - Input, Textarea, Checkbox, RadioGroup, Select, Switch
 * - InputOTP, Slider, Label
 * 
 * DISPLAY:
 * - Card, Badge, Avatar, Alert, Separator
 * - Skeleton, AspectRatio, Table
 * 
 * OVERLAYS:
 * - Dialog, AlertDialog, Sheet, Popover, Tooltip
 * - DropdownMenu, Toast
 * 
 * NAVIGATION:
 * - Tabs, Pagination, Drawer
 * 
 * LAYOUT:
 * - Accordion, Collapsible, ScrollArea
 * 
 * FEEDBACK:
 * - Progress, Toast, Alert
 * 
 * INTERACTIVE:
 * - Button, Toggle
 */

/**
 * Installation requirements:
 * 
 * Required for all:
 * npm install react-native-safe-area-context
 * 
 * Optional (for specific components):
 * npm install @react-native-community/slider (Slider)
 * npm install react-native-toast-message (Toast)
 * npm install react-native-walkthrough-tooltip (Tooltip)
 * npm install react-native-popover-view (Popover)
 * npm install @gorhom/bottom-sheet (Sheet)
 * npm install @react-navigation/drawer (Drawer)
 * npm install react-native-reanimated (animations)
 * npm install react-native-gesture-handler (gestures)
 * npm install expo-haptics (haptic feedback)
 */
